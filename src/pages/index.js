import {useRouter} from 'next/router';
import {withAuthGuard} from '../hocs/with-auth-guard';
import {withDashboardLayout} from '../hocs/with-dashboard-layout';

const Index = () => {
    const router = useRouter();
    router.push('/dashboard/');
    return <div>Loading</div>;
};

export default withAuthGuard(withDashboardLayout(Index));
