import profileimg from "../../assets/profile.jpg";
  
  export const useVerifiedImage = () => {
  const getVerifiedImage = (profile) => {
    return profile?.image_verification === 'active' && profile?.image 
      ? profile.image 
      : profileimg;
  };

  return { getVerifiedImage };
};