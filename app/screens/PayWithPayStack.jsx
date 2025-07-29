import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { PaystackWebView } from 'react-native-paystack-webview'; // ✅ correct import

export default function PayWithPaystack() {
  const router = useRouter();
  const { email, amount } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <PaystackWebView
        paystackKey="pk_test_10a5ea1f1852ddd229fb1b5766574c2c209fc08a"
        amount={parseFloat(amount)}
        billingEmail={email}
        onSuccess={(res) => {
          console.log('✅ Payment success:', res);
          router.replace({
            pathname: '/screens/BookingConfirmation',
            params: { reference: res.transactionRef },
          });
        }}
        onCancel={() => {
          console.log('❌ Payment cancelled');
          router.back();
        }}
        autoStart={true}
      />
    </View>
  );
}
