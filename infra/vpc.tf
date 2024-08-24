
module "vpc" {
    source = "github.com/yoav-klein/terraform//aws/modules/vpc"
    name = "grocery-app"
    cidr = "10.0.0.0/16"
    public_subnets = [{
        az = "us-east-1b"
        cidr = "10.0.101.0/24"
    }, {
        az = "us-east-1a"
        cidr = "10.0.102.0/24"
    }]
    private_subnets = [{
        az = "us-east-1a"
        cidr = "10.0.1.0/24"
    }, {
        az = "us-east-1b"
        cidr = "10.0.2.0/24"
    }]
}
