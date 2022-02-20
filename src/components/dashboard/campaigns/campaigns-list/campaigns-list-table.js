import {useEffect, useState} from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Box, Button, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from '@mui/material';
import {ArrowRight as ArrowRightIcon} from '@/icons/arrow-right';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {Scrollbar} from '../../../scrollbar';
import {CampaignStatus} from '@/components/dashboard/common/statuses/campaign-status';


export const CampaignsListTable = (props) => {
    const {
        campaigns,
        campaignsCount,
        onPageChange,
        onRowsPerPageChange,
        onCampaignSelect,
        page,
        rowsPerPage,
        ...other
    } = props;
    const [selectedCampaigns, setSelectedCampaigns] = useState([]);

    useEffect(() => {
            if (setSelectedCampaigns.length) {
                setSelectedCampaigns([]);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [campaigns]);

    const handleSelectAllCampaigns = (event) => {
        setSelectedCampaigns(event.target.checked
            ? campaigns.map((campaign) => campaign.id)
            : []);
    };

    const handleSelectOneCampaign = (event, campaignId) => {
        if (!selectedCampaigns.includes(campaignId)) {
            setSelectedCampaigns((prevSelected) => [...prevSelected, campaignId]);
        } else {
            setSelectedCampaigns((prevSelected) => prevSelected.filter((id) => id !== campaignId));
        }
    };

    const enableBulkActions = selectedCampaigns.length > 0;
    const selectedSomeCampaigns = selectedCampaigns.length > 0
        && selectedCampaigns.length < campaigns.length;
    const selectedAllCampaigns = selectedCampaigns.length === campaigns.length;

    return (
        <div {...other}>
            <Box
                sx={{
                    backgroundColor: 'neutral.100',
                    display: !enableBulkActions && 'none',
                    px: 2,
                    py: 0.5
                }}
            >
                <Checkbox
                    checked={selectedAllCampaigns}
                    indeterminate={selectedSomeCampaigns}
                    onChange={handleSelectAllCampaigns}
                />
                <Button
                    size="small"
                    sx={{ ml: 2 }}
                >
                    Delete
                </Button>
                <Button
                    size="small"
                    sx={{ ml: 2 }}
                >
                    Edit
                </Button>
            </Box>
            <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAllCampaigns}
                                    indeterminate={selectedSomeCampaigns}
                                    onChange={handleSelectAllCampaigns}
                                />
                            </TableCell>
                            <TableCell>
                                Nazwa zbioru danych
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                            <TableCell>
                                Data dodania
                            </TableCell>
                            <TableCell align="right">
                                Akcje
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campaigns.map((campaign) => {
                            const isCampaignSelected = selectedCampaigns.includes(campaign.id);

                            return (
                                <TableRow
                                    hover
                                    key={campaign.id}
                                    selected={isCampaignSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isCampaignSelected}
                                            onChange={(event) => handleSelectOneCampaign(event, campaign.id)}
                                            value={isCampaignSelected}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {campaign.name}
                                    </TableCell>
                                    <TableCell>
                                        <CampaignStatus status={campaign.status}/>
                                    </TableCell>
                                    <TableCell>
                                        {campaign.createdDate}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button component="a"
                                                variant="outlined"
                                                size="small"
                                                sx={{ mr: 2 }}
                                                endIcon={(
                                                    <PencilAltIcon fontSize="small" />
                                                )}
                                                onClick={() => onCampaignSelect(campaign.id)}>
                                            Edytuj
                                        </Button>
                                        <NextLink href={`/dashboard/campaigns/${campaign.id}`} 
                                                  passHref>
                                            <Button component="a"
                                                    size="small"
                                                    endIcon={(
                                                        <ArrowRightIcon fontSize="small" />
                                                    )}
                                                    variant={campaign.status === "CLOSED" ? "outlined" : "contained"}>
                                                Przejdź
                                            </Button>
                                        </NextLink>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={campaignsCount}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};

CampaignsListTable.propTypes = {
    campaigns: PropTypes.array.isRequired,
    campaignsCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};
