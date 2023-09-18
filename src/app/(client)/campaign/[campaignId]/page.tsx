export default function Page({ params }: { params: { campaignId: string } }) {
    return <div>My CampaignId: {params.campaignId}</div>
  }