import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import {
  getItemsMenuAPI,
} from "../api/itemApi";

export default function TopPicks() {
  const [itemList, setItemList] = useState([]);
  const getMenu = async () => {
    const res = await getItemsMenuAPI();
    setItemList(res.data.data);
  }
  useEffect(() => {
    getMenu();
  }, [])
  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {itemList &&
          itemList?.map((item, index) => (
            <SwiperSlide>
              <div
                key={index}
                className="w-full max-w-sm bg-white border-2xl border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                style={{ fontFamily: "Inter" }}
              >
                <img
                  referrerPolicy="no-referrer"
                  key={item.id}
                  className="p-8 rounded-t-lg"
                  alt="product"
                  src={item?.src}
                  placeholderSrc={require("../assets/photo.png")}
                ></img>
                {/* {!isImageLoaded.get(item.id) && t && (<Skeleton square height={200} className="pt-2"></Skeleton>)} */}
                <div className="px-5 pb-5">
                  <span>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                  </span>
                  {/* <div className="flex items-center justify-between mt-6">
                    <span className="text-1xl font-bold text-gray-900 dark:text-white">
                      Rs. {item.price}
                    </span>
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}