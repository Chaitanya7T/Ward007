export interface Cases{
id:string,
name :string,
mobileNumber :string,
description:string,
date:string  ,
vehicleNumber:string,
idProof?: IdProof,
suspectPhoto?:string,
vehiclePhoto?: string,
}

interface IdProof{
    front: string,
    back : string
    }
