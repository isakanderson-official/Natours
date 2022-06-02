import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51L3o2kJ1oqPzAZ2Qy14727bEolnuFi3TcVHHkKXR5njXH68smsbKjl3biIQwERmN23XViwzStaxCnWDjmcYu9fFI00DhHGY1gq'
);

export const bookTour = async (tourId) => {
  try {
    // 1 Get checkout sessions from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //console.log(session);

    // 2 Create check form + Charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
