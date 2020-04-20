const core = require('@actions/core')
const exec = require('@actions/exec')

// catch failed exec
process.on('unhandledRejection', err => {
  core.setFailed(err.message);
});

const setup = async () => {
  const cluster = core.getInput('cluster');
  const region = core.getInput('region');
  const namespace = core.getInput('namespace');
  // aws cli should be ready to use
  await exec.exec('aws --version');
  // setup kubectl via aws eks cli
  await exec.exec(`aws eks --region ${region} update-kubeconfig --name "${cluster}"`);
  // create the specified namespace if it doesn't exist
  // /bin/bash to workaround exec limitation of not supporting pipe
  await exec.exec(`/bin/bash -c "kubectl create namespace ${namespace} --dry-run=client -o yaml | kubectl apply -f -"`);
  // set namespace context for kubectl
  await exec.exec(`kubectl config set-context --current --namespace=${namespace}`);
  // kubectl is ready
  await exec.exec('kubectl version');
};

const run = async () => {
  try {
    await setup();
  } catch (error) {
    core.setFailed(error.message);
  } finally {
    console.log("action completed");
  }
};

run();