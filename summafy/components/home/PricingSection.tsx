
const plans =[
    {
        id:'Free',
        name:'basic',
        price: 0,
        items:['10 PDF summaries per month']
    },
    {
        id:'pro',
        name:'Pro',
        price:9,
    }
];
const PricingCard= () => {
    return <div>PricingCard</div>
}

export default function PricingSection(){
    return(
        <section>
            <div className={"py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 "}>
                <div>
                    <h2>
                        Pricing
                    </h2>
                </div>
                <div className={"relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8"}>
                    {plans.map((plan) => (
                        <PricingCard key={plan.id} {...plan}/>
                    ))}
                </div>
            </div>
        </section>
    )
}