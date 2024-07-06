import React from 'react'
import Skeleton from 'react-loading-skeleton'

function OffreDetailSkeleton() {
    return (
        <div className="mt-4 container mx-auto px-4 md:px-8 lg:px-16">
            <figure className="w-full">
                <Skeleton height={320} width="100%" className="rounded-lg" />
            </figure>
            <div className="card-body p-0">
                <h1 className="card-title text-lg sm:text-xl md:text-2xl mt-3">
                    <Skeleton width={300} />
                </h1>
                <div className="flex flex-col gap-4 mt-3">
                    <div className="flex flex-wrap gap-3">
                        <Skeleton circle={true} height={40} width={40} />
                        <p className="text-xs uppercase underline font-semibold mt-2">
                            <Skeleton width={200} />
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-3 p-4 border-2 border-gray-300 rounded-lg shadow-md">
                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-700 font-semibold">A propos</p>
                        <Skeleton count={3} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-700 font-semibold">Compensation</p>
                        <Skeleton count={2} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-700 font-semibold">Exigences</p>
                        <Skeleton count={2} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-700 font-semibold">Statistiques</p>
                        <Skeleton count={5} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-neutral-700 font-semibold">Disponibilite</p>
                        <Skeleton count={7} />
                    </div>
                </div>
                <button
                    className="btn md:btn-wide w-full border-1 border-black rounded-full btn-primary mt-4"
                >
                    <Skeleton height={40} />
                </button>
            </div>
        </div>
    )
}

export default OffreDetailSkeleton