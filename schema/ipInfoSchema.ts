import { z } from "zod";

const IpInfoSchema = z.object({
    ip: z.string(),
    network: z.string().optional().nullish(),
    version: z.string().optional().nullish(),
    city: z.string().optional().nullish(),
    region: z.string().optional().nullish(),
    region_code: z.string().optional().nullish(),
    country: z.string().optional().nullish(),
    country_name: z.string().optional().nullish(),
    country_code: z.string().optional().nullish(),
    country_code_iso3: z.string().optional().nullish(),
    country_capital: z.string().optional().nullish(),
    country_tld: z.string().optional().nullish(),
    continent_code: z.string().optional().nullish(),
    in_eu: z.boolean().optional().nullish(),
    postal: z.string().optional().nullish(),
    latitude: z.number().optional().nullish(),
    longitude: z.number().optional().nullish(),
    timezone: z.string().optional().nullish(),
    utc_offset: z.string().optional().nullish(),
    country_calling_code: z.string().optional().nullish(),
    currency: z.string().optional().nullish(),
    currency_name: z.string().optional().nullish(),
    languages: z.string().optional().nullish(),
    country_area: z.number().optional().nullish(),
    country_population: z.number().optional().nullish(),
    asn: z.string().optional().nullish(),
    org: z.string().optional().nullish(),
});

export default IpInfoSchema;