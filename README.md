# Setup EKS Kubectl

## Prerequisites

- AWS CLI must be available and logged in via `aws-actions/configure-aws-credentials`.
- AWS user being used should have proper EKS permissions.
- Be sure to add the AWS user to `mapUsers` section via `kubectl -n kube-system edit cm aws-auth`. ([AWS Docs](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html))

## Get Started

```yml
- name: Setup EKS Kubectl
  uses: zachguo/setup-eks-kubectl@v1
  with:
    cluster: your-cluster # name of your EKS cluster
    region: us-west-2 # region of your EKS cluster
    namespace: production # optional namespace context, default value is 'default'
```

Then `kubectl` CLI will be available to later steps.

## License
MIT