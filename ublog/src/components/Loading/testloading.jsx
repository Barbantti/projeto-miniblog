import { useState } from "react";

const [isLoading, setIsLoading] = useState(true);

  function loading () {
    if (isLoading) {
      (
       <Flex align="center" justify="center" height="80vh">
         <Spinner size="lg" />
       </Flex>
     )
     return
  }
  }

  useEffect(() => {
    if ((cartData && reservationData) || ticketReservationData) {
      setIsLoading(false);
    }
  }, [cartData, ticketReservationData, reservationData]);