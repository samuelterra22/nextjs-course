import Prismic from 'prismic-javascript'
import {bindReporter} from "web-vitals/dist/lib/bindReporter";

export const apiEndpoint = 'https://samdevcommerce.cdn.prismic.io/api/v2';

export const client = (req = null) => {
    const options = req ? { req } : null;

    return Prismic.client(apiEndpoint, options)
}
