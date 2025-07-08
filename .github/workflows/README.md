# GitHub Actions Deployment Workflows

This directory contains GitHub Actions workflows for automated deployment.

## Deploy to Staging

The `deploy-to-staging.yml` workflow automatically deploys to the staging environment when changes are pushed to the `development` branch.

### Required GitHub Secrets

To use this workflow, you need to configure the following secrets in your GitHub repository settings:

1. `SSH_PRIVATE_KEY`: The private SSH key for connecting to your staging server
2. `KNOWN_HOSTS`: The SSH known_hosts content for your staging server
3. `DATABASE_YML`: Content of your config/database.yml file
4. `SECRETS_YML`: Content of your config/secrets.yml file

### How to Set Up GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add each of the required secrets listed above

### Generating the KNOWN_HOSTS Content

Run the following command to get the known_hosts content for your server:
```bash
ssh-keyscan -H your-server-hostname-or-ip >> ~/.ssh/known_hosts
cat ~/.ssh/known_hosts
```

Copy the output related to your server and add it as the `KNOWN_HOSTS` secret.