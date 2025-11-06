import { getCountryCode, getLanguageCode } from "./Utils/localStorage";

const base_url = () => {
  let countryCode = getCountryCode();
  let languageCode = getLanguageCode();
  if (countryCode && languageCode) {
    return `https://${countryCode}-${languageCode}.onlineparttimejobs.in/api/`;
  } else {
    return `https://onlineparttimejobs.in/api/`;
  }
};

export { base_url };
