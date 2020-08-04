import sendEvent from "../pagerduty/sendEvent";
import PD_CONSTANTS from "../pagerduty/constants";

const generateID = () => {
  let s4 = (radix = 16) => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(radix)
      .substring(1);
  };
  return `${s4()}${s4()}`;
};

// Website errors (these are core to every demo)
export const customerIssues = () => {
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_zendesk_website_customer_reports`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary: "Warning: Increased customer reports of website failure by 25%",
      source: "Zendesk",
      severity: "warning",
      component: "website",
      group: "prod",
      class: "helpdesk",
      custom_details: {
        priority: "P3",
        event_id: generateID(),
        tags: ["aws-eks-prod", "pd_az:us-west-2c", "production", "mariadb"],
      },
    },
  };
  sendEvent(payload);
};

export const highCPU = () => {
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_datadog_high_cpu`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary:
        "Warning: Increased Response Time Detected - Avg 9595ms | 90% CPU",
      source: "Datadog",
      severity: "warning",
      component: "website",
      group: "prod",
      class: "helpdesk",
      custom_details: {
        priority: "P3",
        event_id: generateID(),
        tags: ["aws-eks-prod", "pd_az:us-west-2c", "production", "mariadb"],
      },
    },
  };
  sendEvent(payload);
};

// Payment Error Payloads
export const paymentTransactionFailure = () => {
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_new_relic_123_website_failure`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary:
        "Critical: Transaction failure on payments form - connection pool exhausted",
      source: "New Relic",
      severity: "critical",
      component: "website",
      group: "prod",
      class: "checkout-page",
      custom_details: {
        host: "pod/website-64f46d8b94-nrrd4",
        priority: "P1",
        event_id: generateID(),
        tags: ["aws-eks-prod", "pd_az:us-west-2c", "production", "mariadb"],
      },
    },
    images: [
      {
        src:
          "https://s3.eu-west-2.amazonaws.com/www.timchinchen.co.uk/DemoImages/NRErrors2.png",
        href: "http://www.timchinchen.co.uk/DemoImages/NRErrors1.png",
        alt: "Snapshot of metric",
      },
    ],
    links: [
      {
        text: "Zoom: Conference URL",
        href: "https://pagerduty.zoom.us/j/5080555253",
      },
      {
        text: "Zoom: Conference Call",
        href: "tel:+442036950088,,5080555253#",
      },
      {
        text: "New Relic: Dashboard",
        href:
          "https://rpm.newrelic.com/accounts/1818495/applications/105833762?tw%5Bend%5D=1518535392&tw%5Bstart%5D=1518528373",
      },
    ],
  };
  sendEvent(payload);
};

export const paymentTransactionTimeout = () => {
  let transaction_id = generateID();
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_new_relic_123_website_timeout`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary: `Error: Transaction timeout (ID: ${transaction_id})`,
      source: "New Relic",
      severity: "error",
      component: "website",
      group: "prod",
      class: "transaction",
      custom_details: {
        host: "pod/website-64f46d8b94-nrrd4",
        priority: "P2",
        event_id: generateID(),
        transaction_id,
        transaction_process_time: -1,
        tags: ["aws-eks-prod", "pd_az:us-west-2c", "production", "mariadb"],
      },
    },
  };
  sendEvent(payload);
};

export const paymentOutOfMemory = () => {
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_grafana_123`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary: "Warning: java.lang.OutOfMemoryError: Java heap space",
      source: "Grafana",
      severity: "warning",
      component: "payments",
      group: "prod",
      class: "db-connection",
      custom_details: {
        host: "pod/payments-d85c4ddc9-jzlz7",
        priority: "P3",
        event_id: generateID(),
        JVM_ARGS:
          "-Xms128m -Xmx512m -XX:+UseGCLogFileRotation -XX:+HeapDumpOutOfMemoryError",
        tags: ["aws-eks-prod", "pd_az:us-west-2c", "production", "mariadb"],
      },
    },
    images: [
      {
        src:
          "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
        href: "https://acme.pagerduty.com",
        alt: "This is a sample link",
      },
    ],
  };
  sendEvent(payload);
};

// Car Insurance Error Payloads
export const insuranceQuoteFailure = () => {
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_new_relic_123_website_failure`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary:
        "Critical: Quote failure on insurance form - connection pool exhausted",
      source: "New Relic",
      severity: "critical",
      component: "website",
      group: "prod",
      class: "checkout-page",
      custom_details: {
        host: "pod/website-64f46d8b94-nrrd4",
        priority: "P1",
        event_id: generateID(),
        tags: ["aws-eks-prod", "pd_az:us-west-2c", "production", "mariadb"],
      },
    },
    images: [
      {
        src:
          "https://s3.eu-west-2.amazonaws.com/www.timchinchen.co.uk/DemoImages/NRErrors2.png",
        href: "http://www.timchinchen.co.uk/DemoImages/NRErrors1.png",
        alt: "Snapshot of metric",
      },
    ],
    links: [
      {
        text: "Zoom: Conference URL",
        href: "https://pagerduty.zoom.us/j/5080555253",
      },
      {
        text: "Zoom: Conference Call",
        href: "tel:+442036950088,,5080555253#",
      },
      {
        text: "New Relic: Dashboard",
        href:
          "https://rpm.newrelic.com/accounts/1818495/applications/105833762?tw%5Bend%5D=1518535392&tw%5Bstart%5D=1518528373",
      },
    ],
  };
  sendEvent(payload);
};

export const insuranceQuoteTimeout = () => {
  let transaction_id = generateID();
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_new_relic_123_website_timeout`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary: `Error: Quote timeout (ID: ${transaction_id})`,
      source: "New Relic",
      severity: "error",
      component: "website",
      group: "prod",
      class: "transaction",
      custom_details: {
        host: "pod/website-64f46d8b94-nrrd4",
        priority: "P2",
        event_id: generateID(),
        transaction_id,
        transaction_process_time: -1,
        tags: ["aws-eks-prod", "pd_az:us-west-2c", "production", "mariadb"],
      },
    },
  };
  sendEvent(payload);
};

// Credit Check Error
export const creditCheckOutOfMemory = () => {
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_grafana_123`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary: "Warning: java.lang.OutOfMemoryError: Java heap space",
      source: "Grafana",
      severity: "warning",
      component: "credit_check",
      group: "prod",
      class: "db-connection",
      custom_details: {
        host: "pod/credit-check-d85c4ddc9-jzlz7",
        priority: "P3",
        event_id: generateID(),
        JVM_ARGS:
          "-Xms128m -Xmx512m -XX:+UseGCLogFileRotation -XX:+HeapDumpOutOfMemoryError",
        tags: ["aws-eks-prod", "pd_az:us-west-2c", "production", "mariadb"],
      },
    },
    images: [
      {
        src:
          "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
        href: "https://acme.pagerduty.com",
        alt: "This is a sample link",
      },
    ],
  };
  sendEvent(payload);
};

// Analytics Error
export const lowRevenue = () => {
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_salesforce_123`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary:
        "Warning: Low payments detected - under £100k across 5 minute period",
      source: "Salesforce",
      severity: "warning",
      component: "analytics",
      group: "prod",
      class: "revenue",
      custom_details: {
        host: "pod/analytics-bf6466bb7-h9rpw",
        priority: "P3",
        event_id: generateID(),
        tags: ["aws-eks-prod", "pd_az:us-west-2c", "production", "mariadb"],
      },
    },
    images: [
      {
        src: "https://logz.io/wp-content/uploads/2017/03/memory-graph.png",
        href: "https://logz.io/wp-content/uploads/2017/03/memory-graph.png",
        alt: "This is a sample link",
      },
    ],
  };
  sendEvent(payload);
};

// Other related error payloads
export const cloudWatchBill = () => {
  let payload = {
    routing_key: PD_CONSTANTS.ROUTING_KEY,
    dedup_key: `${PD_CONSTANTS.CLIENT}_aws_cloudwatch`,
    event_action: "trigger",
    client: PD_CONSTANTS.CLIENT,
    client_url: PD_CONSTANTS.CLIENT_URL,
    payload: {
      summary: `Warning: Build 0.1.11-5-${generateID()} delayed; estimated charges breached (+10 USD)`,
      source: "AWS CloudWatch",
      severity: "warning",
      component: "payments",
      group: "uat",
      class: "build-metrics",
      custom_details: {
        Unit: null,
        TreatMissingData: "- TreatMissingData:  missing",
        Threshold: 10,
        StatisticType: "Statistic",
        Statistic: "MAXIMUM",
        StateChangeTime: new Date().toISOString(),
        Region: "US East (N. Virginia)",
        Period: 21600,
        OldStateValue: "OK",
        NewStateValue: "ALARM",
        NewStateReason:
          "Threshold Crossed: 1 out of the last 1 datapoints [10.08 (18/05/19 10:17:00)] was greater than or equal to the threshold (10.0) (minimum 1 datapoint for OK -> ALARM transition).",
        Namespace: "AWS/Billing",
        MetricName: "EstimatedCharges",
        EvaluationPeriods: 1,
        EvaluateLowSampleCountPercentile: "",
        Dimensions: [
          {
            value: "USD",
            name: "Currency",
          },
        ],
        ComparisonOperator: "GreaterThanOrEqualToThreshold",
        AlarmName: "TempTest",
        AlarmDescription: null,
        AWSAccountId: "593311969811",
      },
    },
    images: [
      {
        src:
          "https://user-images.githubusercontent.com/9296832/47300570-189ae480-d61d-11e8-9f7d-d20de614477c.png",
        href: "https://acme.pagerduty.com",
      },
    ],
  };
  sendEvent(payload);
};
