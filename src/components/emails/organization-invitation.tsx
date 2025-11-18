import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface OrganizationInvitationEmailProps {
  email: string;
  invitedByUsername: string;
  invitedByEmail: string;
  teamName: string;
  inviteLink: string;
}

const OrganizationInvitationEmail = (
  props: OrganizationInvitationEmailProps
) => {
  const { email, invitedByUsername, invitedByEmail, teamName, inviteLink } =
    props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>You've been invited to join {teamName}</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                You're invited to join {teamName}
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                {invitedByUsername} has invited you to collaborate
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                <strong>{invitedByUsername}</strong> ({invitedByEmail}) has
                invited you to join <strong>{teamName}</strong>. You'll be able
                to collaborate with the team and access shared resources once
                you accept this invitation.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Click the button below to accept your invitation and get
                started:
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={inviteLink}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Accept Invitation
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                If the button doesn't work, you can copy and paste this link
                into your browser:
              </Text>
              <Link
                href={inviteLink}
                className="text-blue-600 text-[14px] break-all underline"
              >
                {inviteLink}
              </Link>
            </Section>

            {/* Additional Info */}
            <Section className="border-t border-gray-200 pt-[24px] mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                <strong>Invitation details:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[4px]">
                • Organization: {teamName}
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[4px]">
                • Invited by: {invitedByUsername}
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                • Your email: {email}
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px]">
                This invitation link will expire in 7 days for security reasons.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                If you weren't expecting this invitation, you can safely ignore
                this email.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[16px]">
                © {new Date().getFullYear()} {teamName}. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                123 Business Street, Suite 100
                <br />
                Business City, BC 12345
                <br />
                <Link href="#" className="text-gray-500 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrganizationInvitationEmail;
