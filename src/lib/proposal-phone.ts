export const proposalCountryCodes = [
  { label: "UK (+44)", value: "+44" },
  { label: "US / Canada (+1)", value: "+1" },
  { label: "Ireland (+353)", value: "+353" },
  { label: "Australia (+61)", value: "+61" },
  { label: "New Zealand (+64)", value: "+64" },
  { label: "India (+91)", value: "+91" },
  { label: "Pakistan (+92)", value: "+92" },
  { label: "Bangladesh (+880)", value: "+880" },
  { label: "UAE (+971)", value: "+971" },
  { label: "Saudi Arabia (+966)", value: "+966" },
  { label: "France (+33)", value: "+33" },
  { label: "Germany (+49)", value: "+49" },
  { label: "Netherlands (+31)", value: "+31" },
  { label: "Spain (+34)", value: "+34" },
  { label: "Italy (+39)", value: "+39" },
  { label: "Portugal (+351)", value: "+351" },
  { label: "Sweden (+46)", value: "+46" },
  { label: "Norway (+47)", value: "+47" },
  { label: "Switzerland (+41)", value: "+41" },
  { label: "Poland (+48)", value: "+48" },
  { label: "Turkey (+90)", value: "+90" },
  { label: "Nigeria (+234)", value: "+234" },
  { label: "South Africa (+27)", value: "+27" },
  { label: "Kenya (+254)", value: "+254" },
  { label: "Singapore (+65)", value: "+65" },
  { label: "Malaysia (+60)", value: "+60" },
  { label: "Philippines (+63)", value: "+63" },
  { label: "Japan (+81)", value: "+81" },
  { label: "South Korea (+82)", value: "+82" },
  { label: "China (+86)", value: "+86" },
] as const;

const supportedCountryCodes = new Set(
  proposalCountryCodes.map(({ value }) => value),
);
const e164PhonePattern = /^\+[1-9]\d{6,14}$/;

/** Returns a normalized E.164 number, null when blank, and undefined when invalid. */
export function normalizeProposalPhone(
  mobileValue: unknown,
  countryCodeValue: unknown,
): string | null | undefined {
  if (mobileValue === undefined && countryCodeValue === undefined) {
    return null;
  }
  if (typeof mobileValue !== "string") {
    return undefined;
  }

  const mobile = mobileValue.trim();
  if (mobile.length > 40) {
    return undefined;
  }

  const countryCode = countryCodeValue === undefined ? "+44" : countryCodeValue;
  if (
    typeof countryCode !== "string" ||
    !supportedCountryCodes.has(
      countryCode as (typeof proposalCountryCodes)[number]["value"],
    )
  ) {
    return undefined;
  }

  if (!mobile) {
    return null;
  }
  if (!/^[+\d\s().-]+$/.test(mobile)) {
    return undefined;
  }

  const digits = mobile.replace(/\D/g, "");
  if (!digits) {
    return undefined;
  }

  if (mobile.startsWith("+")) {
    const internationalNumber = `+${digits}`;
    return e164PhonePattern.test(internationalNumber) &&
      internationalNumber.startsWith(countryCode)
      ? internationalNumber
      : undefined;
  }

  const nationalNumber = digits.startsWith("0") ? digits.slice(1) : digits;
  const internationalNumber = `${countryCode}${nationalNumber}`;
  return e164PhonePattern.test(internationalNumber)
    ? internationalNumber
    : undefined;
}
