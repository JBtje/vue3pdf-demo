import dayjs from 'dayjs';

// PLugins
import relativeTime from 'dayjs/plugin/relativeTime'; // Required for "fromNow"
// Load required languages
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/nl';

dayjs.extend( relativeTime );

// dayjs.locale('de')
// dayjs.locale('en')
dayjs.locale( 'nl' );

export default dayjs;