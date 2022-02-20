import {useRouter} from 'next/router';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';


const Overview = () => {
    const router = useRouter();
    router.push('/dashboard/campaigns');
    return <div>Loading</div>;
};

export default withAuthGuard(withDashboardLayout(Overview));
