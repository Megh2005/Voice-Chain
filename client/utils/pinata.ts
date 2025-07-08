/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
const jwt = process.env.JWT;

export const uploadJSONToIPFS = async (JSONBody: any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

  // Generate random number for the metadata name
  const randomNumber = Math.floor(Math.random() * 1000000);
  const metadataName = `core_metadata_${randomNumber}`;

  // Create the request body with metadata
  const requestBody = {
    pinataContent: JSONBody,
    pinataMetadata: {
      name: metadataName,
    },
  };

  try {
    const res = await axios.post(url, requestBody, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: (error as any).message,
    };
  }
};

export const uploadFileToIPFS = async (data: any) => {
  // Generate random number for the filename
  const randomNumber = Math.floor(Math.random() * 1000000);
  const originalFile = data.get("file");
  const fileExtension = originalFile.name.split(".").pop();
  const newFileName = `core_${randomNumber}.${fileExtension}`;

  const pinataMetadata = JSON.stringify({
    name: newFileName,
  });
  data.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  data.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return {
      success: true,
      pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: (error as any).message,
    };
  }
};
