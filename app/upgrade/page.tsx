'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Upgrade = () => {
    const [planType, setPlanType] = useState('monthly')
    const router = useRouter()
    const pricingPlans = [
        {
            id: 1,
            name: 'Pro Monthly',
            offerings: [
                '100000 tokens',
                'UI Libraries Generation',
                'Download Code',
                'Priority Support',
                'Custom Instructions',
            ],
            price: 2,
            type: 'monthly',
            currency: '$',
        },
        {
            id: 2,
            name: 'Pro Yearly',
            offerings: [
                'Use GPT for better results',
                '1200000 tokens',
                'UI Libraries Generation',
                'Download Code',
                'Priority Support',
                'Custom Instructions',
            ],
            price: 20,
            type: 'yearly',
            currency: '$',
        },
    ]
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col my-[100px] gap-[1rem] text-center">
                <div
                    onClick={() => router.back()}
                    className="flex absolute top-3 left-3 items-center cursor-pointer justify-start gap-[.5rem] border-[1px] border-[#1e1e1e] rounded-lg w-fit px-4 py-2  hover:bg-[#1e1e1e]"
                >
                    <BsArrowLeft /> Go back
                </div>
                <h1 className="text-7xl font-bold">Upgrade your plan</h1>
                <p className="text-xl">
                    and enjoy all the amazing features and perks of Lemma
                </p>

                <div className="flex items-center justify-center gap-[1rem]">
                    <div
                        onClick={() => setPlanType('monthly')}
                        style={{
                            backgroundColor:
                                planType === 'monthly'
                                    ? '#1e1e1e'
                                    : 'transparent',
                        }}
                        className="w-[100px] cursor-pointer h-[40px] flex items-center justify-center rounded-lg border-[1px] border-[#1e1e1e]"
                    >
                        Monthly
                    </div>
                    <div
                        onClick={() => setPlanType('yearly')}
                        style={{
                            backgroundColor:
                                planType === 'yearly'
                                    ? '#1e1e1e'
                                    : 'transparent',
                        }}
                        className="w-[100px] cursor-pointer h-[40px] flex items-center justify-center rounded-lg border-[1px] border-[#1e1e1e]"
                    >
                        Yearly
                    </div>
                </div>

                <div>
                    {pricingPlans.map((plan) => {
                        if (plan.type === planType) {
                            return (
                                <div
                                    key={plan.id}
                                    className=" p-4 min-h-[500px] flex flex-col w-[300px] rounded-lg border-2 border-[#1e1e1e]  gap-[1rem]"
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-3xl font-semibold">
                                            {plan.name}
                                        </p>
                                        <p className="text-3xl font-semibold">
                                            {plan.currency}
                                            {plan.price}
                                        </p>
                                    </div>
                                    <hr className="opacity-20 my-3" />
                                    <div className="flex-grow">
                                        {plan.offerings.map(
                                            (offering, index) => {
                                                return (
                                                    <p
                                                        key={offering}
                                                        className={`text-md flex items-center justify-start gap-[.5rem] leading-[40px] text-left ${planType === 'yearly' && index === 0 ? '!text-teal-400' : ''}`}
                                                    >
                                                        <BsArrowRight className="mt-[1px]" />{' '}
                                                        {offering}
                                                    </p>
                                                )
                                            }
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            toast(
                                                'Payment method coming soon!',
                                                {
                                                    icon: '🚀',
                                                }
                                            )
                                        }}
                                        className="bg-white w-full h-[40px] rounded-lg text-black font-semibold mt-4"
                                    >
                                        Pay with LemonSqueezy
                                    </button>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Upgrade
