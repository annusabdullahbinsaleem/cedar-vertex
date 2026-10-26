export const proposalCountryCodes = [
  { label: "United Kingdom (+44)", value: "+44", flags: ["GB"] },
  { label: "United States / Canada (+1)", value: "+1", flags: ["US", "CA"] },
  { label: "Ireland (+353)", value: "+353", flags: ["IE"] },
  { label: "Australia (+61)", value: "+61", flags: ["AU"] },
  { label: "New Zealand (+64)", value: "+64", flags: ["NZ"] },
  { label: "India (+91)", value: "+91", flags: ["IN"] },
  { label: "Pakistan (+92)", value: "+92", flags: ["PK"] },
  { label: "Bangladesh (+880)", value: "+880", flags: ["BD"] },
  { label: "United Arab Emirates (+971)", value: "+971", flags: ["AE"] },
  { label: "Saudi Arabia (+966)", value: "+966", flags: ["SA"] },
  { label: "France (+33)", value: "+33", flags: ["FR"] },
  { label: "Germany (+49)", value: "+49", flags: ["DE"] },
  { label: "Netherlands (+31)", value: "+31", flags: ["NL"] },
  { label: "Spain (+34)", value: "+34", flags: ["ES"] },
  { label: "Italy (+39)", value: "+39", flags: ["IT"] },
  { label: "Portugal (+351)", value: "+351", flags: ["PT"] },
  { label: "Sweden (+46)", value: "+46", flags: ["SE"] },
  { label: "Norway (+47)", value: "+47", flags: ["NO"] },
  { label: "Switzerland (+41)", value: "+41", flags: ["CH"] },
  { label: "Poland (+48)", value: "+48", flags: ["PL"] },
  { label: "Turkey (+90)", value: "+90", flags: ["TR"] },
  { label: "Nigeria (+234)", value: "+234", flags: ["NG"] },
  { label: "South Africa (+27)", value: "+27", flags: ["ZA"] },
  { label: "Kenya (+254)", value: "+254", flags: ["KE"] },
  { label: "Singapore (+65)", value: "+65", flags: ["SG"] },
  { label: "Malaysia (+60)", value: "+60", flags: ["MY"] },
  { label: "Philippines (+63)", value: "+63", flags: ["PH"] },
  { label: "Japan (+81)", value: "+81", flags: ["JP"] },
  { label: "South Korea (+82)", value: "+82", flags: ["KR"] },
  { label: "China (+86)", value: "+86", flags: ["CN"] },
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
