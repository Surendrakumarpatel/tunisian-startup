
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaRegHeart } from "react-icons/fa" 
import Link from 'next/link';

const MarketplaceGrid = ({ businesses }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10 lg:px-20 py-10">
            {businesses.map((business) => (
                <Link href={`/marketplace/${business._id}`} key={business._id} className="card compact">
                    <figure className="relative w-full h-0 pb-[90%]">
                        <Image
                            src={business.photo}
                            alt={business.businessName}
                            layout="fill"
                            className="absolute inset-0 object-cover rounded-lg"
                        />
                        <div className="absolute top-4 left-4">
                            <button className="btn btn-sm bg-white bg-opacity-30 backdrop-blur-lg text-white">Top In Miami</button>
                        </div>
                        <div className="absolute top-4 right-4">
                            <button className="btn btn-sm btn-circle bg-white bg-opacity-30 backdrop-blur-lg text-white">
                                <FaRegHeart className="text-red-500 text-xl" />
                            </button>
                        </div>
                    </figure>
                    <div className="card-body">
                        <div className="flex justify-between">
                            <h1 className="card-title">Miami Resort With <br /> Restaurant</h1>
                            <div>
                                <p className="font-bold text-sm">1 Offer</p>
                                <p className="text-cyan-500">Available</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MarketplaceGrid;
