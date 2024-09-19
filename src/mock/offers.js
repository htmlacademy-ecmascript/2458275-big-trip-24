const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '575c1f4b-b575-4ef7-b9ec-9e4e218f9ac0',
        'title': 'Upgrade to a business class',
        'price': 116
      },
      {
        'id': '2666bc9c-0ec7-4156-8a30-deadcca5d0c7',
        'title': 'Choose the radio station',
        'price': 181
      },
      {
        'id': 'a0499b61-8c63-4f89-84bc-0a5740aad819',
        'title': 'Choose temperature',
        'price': 160
      },
      {
        'id': '5345f195-ce01-4217-b986-0ebd5c1b9177',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 192
      },
      {
        'id': '3c8d6fa3-7ff8-459b-a1aa-0e581e45c779',
        'title': 'Drive slowly',
        'price': 140
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 'a4dd55b0-77e6-42da-83f6-7e9b57764d85',
        'title': 'Infotainment system',
        'price': 136
      },
      {
        'id': '49da3166-b680-4fb3-a3fc-3750d534e18e',
        'title': 'Order meal',
        'price': 38
      },
      {
        'id': 'e9d4c4d5-03ab-4da1-ad2f-053ffafba6f1',
        'title': 'Choose seats',
        'price': 156
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': '33cc680e-5a46-46c4-8cab-072b1f5b9b5f',
        'title': 'Book a taxi at the arrival point',
        'price': 74
      },
      {
        'id': 'e420f53e-f5b3-4ccc-9f05-e6b5deb4421a',
        'title': 'Order a breakfast',
        'price': 161
      },
      {
        'id': 'd283cad1-cea0-43ea-a762-d66bd66b2c4c',
        'title': 'Wake up at a certain time',
        'price': 189
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 'd74a218d-3856-4ad3-a6d6-afe05bc1d858',
        'title': 'Choose meal',
        'price': 186
      },
      {
        'id': '25a87dd9-2cb8-468c-bef6-82f463ecc2a1',
        'title': 'Choose seats',
        'price': 47
      },
      {
        'id': '340af942-1d21-4029-b46a-4e45e774ea1f',
        'title': 'Upgrade to comfort class',
        'price': 88
      },
      {
        'id': '54a3feab-0a85-4d74-aec5-3edf5aa8a528',
        'title': 'Upgrade to business class',
        'price': 184
      },
      {
        'id': 'ee4cf70f-c41c-4799-8dc2-533f4e8b2779',
        'title': 'Add luggage',
        'price': 81
      },
      {
        'id': '76ea2f8b-beee-4679-8e53-9b84ca902aa2',
        'title': 'Business lounge',
        'price': 193
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 'aa6a9106-d96f-4315-a2f6-44682515fa7d',
        'title': 'Choose the time of check-in',
        'price': 192
      },
      {
        'id': 'dde49f8e-082b-4313-b8c7-3ffa3e983579',
        'title': 'Choose the time of check-out',
        'price': 121
      },
      {
        'id': '95c2c7c0-a32c-4609-8bac-5c430e52c0c5',
        'title': 'Add breakfast',
        'price': 139
      },
      {
        'id': 'f6a5c152-50da-4478-8b04-8094e6000314',
        'title': 'Laundry',
        'price': 72
      },
      {
        'id': 'd11c331b-9c97-4a1e-98e2-317547f65fd8',
        'title': 'Order a meal from the restaurant',
        'price': 37
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': '02c8eb78-7c08-447a-9cf8-411b903f5520',
        'title': 'Choose meal',
        'price': 159
      },
      {
        'id': '4a4f445d-8aec-4ef2-ade6-db718b4f836b',
        'title': 'Choose seats',
        'price': 164
      },
      {
        'id': '5440aa56-99df-4883-b0b4-273d6e57fa19',
        'title': 'Upgrade to comfort class',
        'price': 123
      },
      {
        'id': '5ca4b465-f9f0-4e3c-8c37-b12e73b6da5b',
        'title': 'Upgrade to business class',
        'price': 45
      },
      {
        'id': '6dffac75-0175-4ac3-9472-f30c39f62822',
        'title': 'Add luggage',
        'price': 165
      },
      {
        'id': '058d4480-2a29-45e8-bbc5-222040188c0d',
        'title': 'Business lounge',
        'price': 68
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '48dfdebf-765a-4d23-a2fd-bdeea66982b1',
        'title': 'With automatic transmission',
        'price': 159
      },
      {
        'id': '5ada23c8-be0a-4498-a8c1-1f630f954c36',
        'title': 'With air conditioning',
        'price': 98
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '86dff655-dbd1-40b9-b477-135652ff710f',
        'title': 'Choose live music',
        'price': 78
      },
      {
        'id': '437293ab-a433-4385-9bdb-dc337043488a',
        'title': 'Choose VIP area',
        'price': 193
      }
    ]
  }
];

export {mockOffers};
