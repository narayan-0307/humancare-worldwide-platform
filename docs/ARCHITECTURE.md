# HumanCare Worldwide - Architecture Decisions

Status: Initial agreed blueprint. Implementation details remain subject to
verification during the relevant phase.

## 1. Project isolation

The new project lives in a dedicated project directory, separate from
the existing HumanCare Worldwide repository.

The existing HumanCare Worldwide repository must remain untouched.

## 2. Applications

### Shared mobile application
- Patient registration, authentication, profile, service browsing, requests,
  and patient-specific request tracking.
- Vendor-specific screens for secure login approval and device management.
- Backend-enforced role separation.

### Admin portal
- Central visibility into patient-originated and vendor-originated leads.
- Service and vendor management, permissions, and synchronization visibility.
- Admin accounts are provisioned using protected terminal commands.
- No dedicated Superadmin dashboard or account-management module.
- No manual assignment of every lead.

### Vendor portal
- Separate web application.
- Vendor accounts are provisioned by authorized Admins.
- Secure activation and credential setup.
- Login approval through the registered Vendor mobile app.
- Access to the service catalogue and only authorized requests and data.

## 3. Authentication and authorization

- Patient authentication supports the agreed email/password and Google/Apple
  sign-in options, with mobile verification and recovery controls.
- Admin authentication uses email/password and an individual WebAuthn passkey.
- Vendor dashboard login requires approval from the registered mobile device.
- The initial elevated account and Admin accounts are provisioned by protected
  terminal commands.
- Backend authorization is mandatory; hiding frontend screens is insufficient.
- Authentication sessions, recovery, device replacement, rate limiting, and
  audit events must be designed and tested securely.

Detailed flows must be finalized in the authentication phase before coding.

## 4. Backend and database

- One shared backend API.
- Node.js and Express.js.
- Prisma for database access and migrations.
- MySQL for HumanCare-owned application records.
- Service-specific business rules and status mappings.
- Separate development and test database configuration.

HumanCare retains its own records independently of CRM availability.

## 5. Lead workflows

### Vendor-originated leads
1. Validate and save the lead in HumanCare.
2. Forward eligible data to Bitrix24 through the backend when integration is
   configured.
3. Operations staff manage the lead in Bitrix24.
4. Synchronize permitted status updates into HumanCare.
5. Show the appropriate data in Admin and authorized Vendor views.

### Patient-originated leads
1. Validate and save the request in HumanCare first.
2. Apply trusted server-side classification and forwarding rules.
3. Forward eligible fields to Bitrix24 through the backend.
4. Synchronize permitted CRM status changes.
5. Show only role-appropriate information in the Admin dashboard and Patient
   application.

## 6. Bitrix24 integration

Not yet implemented. Confirm the CRM account's API access, authorization
method, permissions, supported events/webhooks, custom fields, and stage
mapping with Bitrix24 support before finalizing the integration.

Never expose CRM credentials in the mobile application or web portals.

Plan for unique HumanCare lead IDs, CRM record IDs, idempotency, retries,
failed-sync visibility, audit history, and conflict handling.

## 7. Security and privacy

- Enforce least-privilege access on the backend.
- Minimize fields sent to the CRM.
- Validate all client input.
- Keep secrets in untracked environment configuration or an appropriate
  production secret manager.
- Avoid logging credentials, tokens, OTP values, or unnecessary patient data.
- Audit sensitive access and status changes.
- Verify backup, recovery, and test database isolation.

## 8. Delivery order

1. Project foundation and standards.
2. Authentication and authorization.
3. Patient application.
4. Vendor portal.
5. Admin portal.
6. Service-specific workflows.
7. Bitrix24 integration after requirements are confirmed.
8. Security testing and deployment.

## 9. Change control

Do not add a Superadmin dashboard, manual lead-assignment workflow, duplicate
mobile applications, or premature CRM integration without an explicit
architectural reason and review.
