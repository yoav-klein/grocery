
terraform {
    required_providers {
        aws = {
            source = "hashicorp/aws"
            version = "~> 4.60"
        }
    }
}

terraform {
    backend "s3" {
        bucket = "yoav-grocery-terraform-state"
        key = "state"
    }
}

provider "aws" {
    region = "us-east-1"
}


