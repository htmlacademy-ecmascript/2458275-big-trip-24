import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    'id': '0f617897-0577-4dba-a680-81e5631d1a58',
    'base_price': 2862,
    'date_from': '2024-11-02T21:55:08.370Z',
    'date_to': '2024-11-04T08:28:08.370Z',
    'destination': '16bb8a7c-21c2-4cac-8392-fa9dd3916520',
    'is_favorite': false,
    'offers': [
      '4a4f445d-8aec-4ef2-ade6-db718b4f836b',
      '5440aa56-99df-4883-b0b4-273d6e57fa19',
      '5ca4b465-f9f0-4e3c-8c37-b12e73b6da5b',
      '6dffac75-0175-4ac3-9472-f30c39f62822',
      '058d4480-2a29-45e8-bbc5-222040188c0d'
    ],
    'type': 'ship'
  },
  {
    'id': '55acfbaf-3599-4bc7-80a8-e5a8fb9e2218',
    'base_price': 6064,
    'date_from': '2024-11-04T20:40:08.370Z',
    'date_to': '2024-11-05T18:46:08.370Z',
    'destination': '16bb8a7c-21c2-4cac-8392-fa9dd3916520',
    'is_favorite': true,
    'offers': [
      'ee4cf70f-c41c-4799-8dc2-533f4e8b2779',
      '76ea2f8b-beee-4679-8e53-9b84ca902aa2'
    ],
    'type': 'flight'
  },
  {
    'id': '8fbfa16a-560a-4aa7-bac0-59bdb20258f9',
    'base_price': 799,
    'date_from': '2024-11-07T05:18:08.370Z',
    'date_to': '2024-11-07T21:13:08.370Z',
    'destination': '40b34cdf-7007-4c5d-8583-f2f643d5f815',
    'is_favorite': true,
    'offers': [],
    'type': 'taxi'
  },
  {
    'id': '66c8289c-c228-4af2-a30e-6d0f5f0b46b9',
    'base_price': 6543,
    'date_from': '2024-11-09T19:01:08.370Z',
    'date_to': '2024-11-10T01:12:08.370Z',
    'destination': '40b34cdf-7007-4c5d-8583-f2f643d5f815',
    'is_favorite': false,
    'offers': [
      'a0499b61-8c63-4f89-84bc-0a5740aad819',
      '5345f195-ce01-4217-b986-0ebd5c1b9177',
      '3c8d6fa3-7ff8-459b-a1aa-0e581e45c779'
    ],
    'type': 'taxi'
  },
  {
    'id': 'f3678162-6424-43a0-8764-296c63ca9401',
    'base_price': 9801,
    'date_from': '2024-11-11T12:14:08.370Z',
    'date_to': '2024-11-12T19:18:08.370Z',
    'destination': '5fcf3b8e-5e47-4926-b4ab-fdae235aa85b',
    'is_favorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': '9b1e5200-024d-4f28-a976-58a9041bc0e0',
    'base_price': 1472,
    'date_from': '2024-11-13T13:03:08.370Z',
    'date_to': '2024-11-14T02:51:08.370Z',
    'destination': 'eb033765-70a2-42c1-958e-8b9fca444110',
    'is_favorite': true,
    'offers': [
      'd283cad1-cea0-43ea-a762-d66bd66b2c4c'
    ],
    'type': 'train'
  },
  {
    'id': 'd983a706-5bc9-4ef7-b1a9-78400c7d70f3',
    'base_price': 1901,
    'date_from': '2024-11-14T21:31:08.370Z',
    'date_to': '2024-11-16T17:33:08.370Z',
    'destination': 'fd27cea8-68aa-4b69-af55-6c0c0f01ea85',
    'is_favorite': false,
    'offers': [
      '2666bc9c-0ec7-4156-8a30-deadcca5d0c7',
      'a0499b61-8c63-4f89-84bc-0a5740aad819',
      '5345f195-ce01-4217-b986-0ebd5c1b9177',
      '3c8d6fa3-7ff8-459b-a1aa-0e581e45c779'
    ],
    'type': 'taxi'
  },
  {
    'id': 'd7f37da6-2650-42aa-b28e-ff41028a1af3',
    'base_price': 5306,
    'date_from': '2024-11-16T23:38:08.370Z',
    'date_to': '2024-11-17T12:02:08.370Z',
    'destination': 'ffa2d954-9e4d-4011-9c01-15b9578e8b14',
    'is_favorite': false,
    'offers': [
      'e420f53e-f5b3-4ccc-9f05-e6b5deb4421a',
      'd283cad1-cea0-43ea-a762-d66bd66b2c4c'
    ],
    'type': 'train'
  },
  {
    'id': '83cd990a-d554-4a67-953f-2704c2b0f20c',
    'base_price': 8898,
    'date_from': '2024-11-18T18:37:08.370Z',
    'date_to': '2024-11-20T16:52:08.370Z',
    'destination': '45f6cfaa-fbfc-4739-81f1-bbb923b0ca14',
    'is_favorite': false,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': '1bda6eca-639b-4d9d-807b-80681e45bb52',
    'base_price': 9686,
    'date_from': '2024-11-22T08:04:08.370Z',
    'date_to': '2024-11-23T06:52:08.370Z',
    'destination': 'eb033765-70a2-42c1-958e-8b9fca444110',
    'is_favorite': true,
    'offers': [
      '76ea2f8b-beee-4679-8e53-9b84ca902aa2'
    ],
    'type': 'flight'
  },
  {
    'id': '97562947-8ea8-4a1d-a2fa-895067a289a5',
    'base_price': 6132,
    'date_from': '2024-11-24T23:11:08.370Z',
    'date_to': '2024-11-26T14:34:08.370Z',
    'destination': 'eb033765-70a2-42c1-958e-8b9fca444110',
    'is_favorite': false,
    'offers': [],
    'type': 'taxi'
  },
  {
    'id': 'ec23f08f-2bf1-48e6-9653-756c74b2965d',
    'base_price': 4511,
    'date_from': '2024-11-27T01:29:08.370Z',
    'date_to': '2024-11-28T17:44:08.370Z',
    'destination': '40b34cdf-7007-4c5d-8583-f2f643d5f815',
    'is_favorite': false,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': 'ca3c8065-aabe-4739-9051-271a6da18d35',
    'base_price': 2059,
    'date_from': '2024-11-29T21:28:08.370Z',
    'date_to': '2024-11-30T07:08:08.370Z',
    'destination': '4ca13167-832f-4620-9d1a-30d4044f4155',
    'is_favorite': false,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': '9c4f8a0c-e04b-4167-85a6-d67fb03e2320',
    'base_price': 759,
    'date_from': '2024-12-02T02:39:08.370Z',
    'date_to': '2024-12-02T12:36:08.370Z',
    'destination': '45f6cfaa-fbfc-4739-81f1-bbb923b0ca14',
    'is_favorite': true,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': 'fa84441f-2457-435b-9191-8472f6bbd340',
    'base_price': 1627,
    'date_from': '2024-12-04T03:10:08.370Z',
    'date_to': '2024-12-04T21:46:08.370Z',
    'destination': 'ba8045d8-94da-4c45-a198-a8b9e22c9d3a',
    'is_favorite': false,
    'offers': [
      '49da3166-b680-4fb3-a3fc-3750d534e18e',
      'e9d4c4d5-03ab-4da1-ad2f-053ffafba6f1'
    ],
    'type': 'bus'
  },
  {
    'id': 'f68e40aa-caa9-4809-8c4b-7b9b22054192',
    'base_price': 7936,
    'date_from': '2024-12-06T09:21:08.370Z',
    'date_to': '2024-12-06T22:20:08.370Z',
    'destination': '45f6cfaa-fbfc-4739-81f1-bbb923b0ca14',
    'is_favorite': false,
    'offers': [
      'a0499b61-8c63-4f89-84bc-0a5740aad819',
      '5345f195-ce01-4217-b986-0ebd5c1b9177',
      '3c8d6fa3-7ff8-459b-a1aa-0e581e45c779'
    ],
    'type': 'taxi'
  },
  {
    'id': '26f7393c-42a5-4202-8233-11cf5195d3b6',
    'base_price': 1496,
    'date_from': '2024-12-08T00:58:08.370Z',
    'date_to': '2024-12-08T17:08:08.370Z',
    'destination': 'eb033765-70a2-42c1-958e-8b9fca444110',
    'is_favorite': false,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': '894930f2-f508-45d6-82fe-ff03f02dc681',
    'base_price': 9072,
    'date_from': '2024-12-10T14:46:08.370Z',
    'date_to': '2024-12-12T15:34:08.370Z',
    'destination': '16bb8a7c-21c2-4cac-8392-fa9dd3916520',
    'is_favorite': true,
    'offers': [
      'd11c331b-9c97-4a1e-98e2-317547f65fd8'
    ],
    'type': 'check-in'
  },
  {
    'id': '96630be8-0e25-414d-831c-e3ba242b7b64',
    'base_price': 7193,
    'date_from': '2024-12-13T16:01:08.370Z',
    'date_to': '2024-12-15T08:25:08.370Z',
    'destination': '40b34cdf-7007-4c5d-8583-f2f643d5f815',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '8dc73ce4-6d66-4b24-93df-a8f0d420b68f',
    'base_price': 2581,
    'date_from': '2024-12-16T08:24:08.370Z',
    'date_to': '2024-12-17T08:54:08.370Z',
    'destination': '40b34cdf-7007-4c5d-8583-f2f643d5f815',
    'is_favorite': true,
    'offers': [
      '5345f195-ce01-4217-b986-0ebd5c1b9177',
      '3c8d6fa3-7ff8-459b-a1aa-0e581e45c779'
    ],
    'type': 'taxi'
  },
  {
    'id': '5901db66-9ae7-4266-8749-98304371de4c',
    'base_price': 419,
    'date_from': '2024-12-18T12:31:08.370Z',
    'date_to': '2024-12-20T11:47:08.370Z',
    'destination': '4ca13167-832f-4620-9d1a-30d4044f4155',
    'is_favorite': false,
    'offers': [
      '48dfdebf-765a-4d23-a2fd-bdeea66982b1',
      '5ada23c8-be0a-4498-a8c1-1f630f954c36'
    ],
    'type': 'drive'
  },
  {
    'id': '43d15639-2f6c-451a-b54f-00cc7aed2ecf',
    'base_price': 9940,
    'date_from': '2024-12-22T01:23:08.370Z',
    'date_to': '2024-12-23T00:48:08.370Z',
    'destination': 'eb033765-70a2-42c1-958e-8b9fca444110',
    'is_favorite': true,
    'offers': [],
    'type': 'flight'
  },
  {
    'id': '1b596d3f-48d1-4b18-8df8-ce31e69e3d94',
    'base_price': 2938,
    'date_from': '2024-12-24T13:41:08.370Z',
    'date_to': '2024-12-25T19:24:08.370Z',
    'destination': 'fd27cea8-68aa-4b69-af55-6c0c0f01ea85',
    'is_favorite': true,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': '3b180b30-e694-4d42-ab7e-b45e453e11ce',
    'base_price': 1201,
    'date_from': '2024-12-26T04:29:08.370Z',
    'date_to': '2024-12-28T02:26:08.370Z',
    'destination': 'fd27cea8-68aa-4b69-af55-6c0c0f01ea85',
    'is_favorite': false,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': '05891a9a-4731-447e-a9b6-992054c4cd7b',
    'base_price': 7588,
    'date_from': '2024-12-29T01:23:08.370Z',
    'date_to': '2024-12-30T23:00:08.370Z',
    'destination': 'fd27cea8-68aa-4b69-af55-6c0c0f01ea85',
    'is_favorite': true,
    'offers': [],
    'type': 'train'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
