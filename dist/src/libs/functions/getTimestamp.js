import { format } from 'date-fns';
export default function getTimestamp() {
    const dateNow = new Date();
    const nowString = format(dateNow, 'yyyyMMdd HH:MM:SS');
    return nowString;
}
//# sourceMappingURL=getTimestamp.js.map