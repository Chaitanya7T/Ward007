export interface Case {
  _id: string;
  name: string;
  mobile_number: string;
  createdBy?:string;
  description: string;
  date: string;
  vehicle_number: string;
  id_proof?: IdProof;
  suspect_photo?: Image;
  vehicle_photo?: Image;
  status?:string;
  createdAt:string;
  updatedAt:string;
}

interface IdProof {
  front: Image;
  back: Image;
}

interface Image {
  type: string;
  path: string;
  image: string;
}
