export const ADDRESSES_REQUEST = "pages/home/ADDRESSES_REQUEST",
  ADDRESSES_RESPONSE = "pages/home/ADDRESSES_RESPONSE",
  addressesRequest = query => {
    return {
      type: ADDRESSES_REQUEST,
      query
    };
  };
