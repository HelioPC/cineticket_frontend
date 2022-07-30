import Card from "../../components/Card";
import List from "../../components/List";
import { cardsData } from '../../data/data';

const Profile = () => {
    return (
        <div className='text-black w-full h-full overflow-visible inline-block'>

            <div className='md:w-full w-[90%] flex lg:flex-row flex-col gap-3'>
                {
                    cardsData.map((card, index) => {
                        return (
                            <div className='w-full h-36' key={index}>
                                <Card title={card.title} color={card.color} barValue={card.barValue} value={card.value} icon={card.icon} series={card.series} />
                            </div>
                        )
                    })
                }
            </div>

            <div className='shadow-[2px_4px_10px_1px_rgba(0,0,0,.5)] my-20'>
                <List />
            </div>
        </div>
    );
}

export default Profile;
