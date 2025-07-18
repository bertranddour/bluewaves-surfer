# Security Policy

## Supported Versions

We actively support the following versions of Surfer Design System:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in Surfer Design System, please report it responsibly.

### How to Report

1. **Email**: Send details to security@bluewaves.boutique
2. **Include**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes

### What to Expect

- **Acknowledgment**: Within 24 hours
- **Initial Assessment**: Within 72 hours  
- **Regular Updates**: Every 7 days until resolved
- **Fix Timeline**: Critical issues within 7 days, others within 30 days

### Security Best Practices

When using Surfer Design System:

1. **Keep Dependencies Updated**: Regularly update to the latest version
2. **Validate User Input**: Always sanitize data passed to components
3. **CSP Headers**: Implement Content Security Policy headers
4. **Bundle Analysis**: Monitor your bundle for known vulnerabilities
5. **Access Control**: Limit who can install/update packages in your project

### Known Security Considerations

- Components that accept `dangerouslySetInnerHTML` should be used with caution
- CLI tools require file system access - review generated code before committing
- External dependencies are regularly audited but should be monitored

## Vulnerability Disclosure Timeline

1. **Day 0**: Vulnerability reported
2. **Day 1**: Acknowledge receipt and begin assessment
3. **Day 7**: Provide initial assessment and timeline
4. **Day X**: Release fix (timeline depends on severity)
5. **Day X+7**: Public disclosure (after fix is available)

## Security Contacts

- **Primary**: security@bluewaves.boutique
- **Backup**: Contact via GitHub Issues (for non-sensitive reports)

Thank you for helping keep Surfer Design System secure!