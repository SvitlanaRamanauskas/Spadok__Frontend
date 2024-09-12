import { useEffect, useState } from "react";
import { Vyshyvanka } from "../types/Vyshyvanka";
import { fetchBoysVyshyvanky } from "../helper/fetch";
import { List } from "../components/List";
import { Loader } from "../components/Loader";

export const BoysPage = () => {
    const [boyVyshyvanky, setBoyVyshyvanky] = useState<Vyshyvanka[]>([]);
    const [boyProductsLoading, setBoyProductsLoading] = useState(false);
    
    useEffect(() => {
        setBoyProductsLoading(true);
        setTimeout(()=> {
            fetchBoysVyshyvanky()
            .then(femaleProducts => setBoyVyshyvanky(femaleProducts))
            .catch(error => {
                throw new Error('Error fetching boy`s vyshyvanky:', error);
              }
            )
            .finally(() => setBoyProductsLoading(false))
        }, 1000);
    
    }, [])
    
    return  (
        <div>

            {boyProductsLoading && <Loader />}

            <List items={boyVyshyvanky} />
        </div>
    )
}
