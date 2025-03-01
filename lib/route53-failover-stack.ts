import * as cdk from "@aws-cdk/core"
import * as route53 from "@aws-cdk/aws-route53"
import * as targets from "@aws-cdk/aws-route53-targets"

export class Route53FailoverStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Create a hosted zone
    const hostedZone = new route53.HostedZone(this, "HostedZone", {
      zoneName: "example.com",
    })

    // Create health checks for primary and secondary regions
    const primaryHealthCheck = new route53.HealthCheck(this, "PrimaryHealthCheck", {
      type: route53.HealthCheckType.HTTP,
      resourcePath: "/",
      fullyQualifiedDomainName: "primary.example.com",
    })

    const secondaryHealthCheck = new route53.HealthCheck(this, "SecondaryHealthCheck", {
      type: route53.HealthCheckType.HTTP,
      resourcePath: "/",
      fullyQualifiedDomainName: "secondary.example.com",
    })

    // Create DNS records with failover routing policy
    new route53.RecordSet(this, "PrimaryRecord", {
      zone: hostedZone,
      recordName: "www.example.com",
      recordType: route53.RecordType.A,
      target: route53.RecordTarget.fromAlias(new targets.ElasticBeanstalkEnvironmentEndpointTarget("primary-env-url")),
      failover: route53.FailoverRecord.PRIMARY,
      healthCheck: primaryHealthCheck,
    })

    new route53.RecordSet(this, "SecondaryRecord", {
      zone: hostedZone,
      recordName: "www.example.com",
      recordType: route53.RecordType.A,
      target: route53.RecordTarget.fromAlias(
        new targets.ElasticBeanstalkEnvironmentEndpointTarget("secondary-env-url"),
      ),
      failover: route53.FailoverRecord.SECONDARY,
      healthCheck: secondaryHealthCheck,
    })
  }
}

