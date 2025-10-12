# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within CineFlix, please send an email to the repository maintainer or create a private security advisory on GitHub.

**Please do not publicly disclose the vulnerability until it has been addressed.**

### What to Include

- Type of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- We aim to acknowledge reports within 48 hours
- We will provide a detailed response within 7 days
- We will work on a fix and keep you updated

## Security Best Practices

### Environment Variables
- Never commit `.env` files
- Use `.env.example` as a template
- Store sensitive data in environment variables only

### API Keys
- Keep your TMDB API key secure
- Use environment variables in production
- Rotate keys if compromised

### Dependencies
- Regularly update dependencies
- Run `npm audit` to check for vulnerabilities
- Use `npm audit fix` to apply patches

### Deployment
- Enable HTTPS in production
- Use security headers (already configured)
- Keep server and runtime updated

## Security Features

This project includes:
- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options header
- ✅ X-Content-Type-Options header
- ✅ Referrer-Policy header
- ✅ Permissions-Policy header
- ✅ HSTS (Strict-Transport-Security)
- ✅ Environment variable protection
- ✅ Secure TMDB API integration

## Contact

For security concerns, please contact through:
- GitHub Issues (for non-sensitive matters)
- GitHub Security Advisories (for vulnerabilities)
- Repository maintainer directly (for critical issues)
