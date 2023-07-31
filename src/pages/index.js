import {useRouter} from 'next/router';
import {withAuthGuard} from '../hocs/with-auth-guard';
import {withDashboardLayout} from '../hocs/with-dashboard-layout';
import {Loading} from '@/components/dashboard/common/loading';

const Index = () => {
    const router = useRouter();
    router.push('/dashboard/campaigns');
    return <Loading/>;
};

export default withAuthGuard(withDashboardLayout(Index));
