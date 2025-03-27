import dynamic from 'next/dynamic';

const OtpInput = dynamic(() => import('react-otp-input'), {
  ssr: false,
});

export default OtpInput;