const categories = [
  {
    id: '1',
    categories: 'NFTs',
    image:
      'https://freerangestock.com/sample/145734/nft-marketplace--nft-defi--blockchain-ecosystem-for-nfts.jpg',
  },
  {
    id: '2',
    categories: 'Trending',
    image:
      'https://png.pngtree.com/thumb_back/fh260/background/20190220/ourmid/pngtree-ui-material-irregular-geometry-fashion-trend-line-irregular-line-surface-image_4441.jpg',
  },
  {
    id: '3',
    categories: 'Recent',
    image:
      'https://static.vecteezy.com/vite/assets/main-masthead-375-26b5f940.webp',
  },
  {
    id: '4',
    categories: 'Animals',
    image:
      'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?cs=srgb&dl=pexels-pixabay-247502.jpg&fm=jpg',
  },
  {
    id: '5',
    categories: 'Anime',
    image:
      'https://1.bp.blogspot.com/-Ht6nHUeJhHQ/YBhurQQtWhI/AAAAAAAAIWA/IAhQQqJ3utY2vj6HL9OEMNxKzOTNgrWYQCLcBGAsYHQ/s1280/free-anime-image.JPG',
  },
  {
    id: '6',
    categories: 'Bollywood',
    image:
      'https://img.freepik.com/free-vector/bollywood-lettering-with-mandala-wallpaper_23-2148477417.jpg',
  },

  {
    id: '7',
    categories: 'Logos',
    image:
      'data:image/jpeg;base64,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',
  },
  {
    id: '8',
    categories: 'Cars & Vehicles',
    image:
      'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?cs=srgb&dl=pexels-albin-berlin-919073.jpg&fm=jpg',
  },
  {
    id: '9',
    categories: 'Bikes',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnrOS5us7RTgt_ZAxfvvgcm0dWF-BSLkMrzUaZSp_DkHc9TErDr5G_VqhN4bl8V02Rl8E&usqp=CAU',
  },
  {
    id: '10',
    categories: 'Drawings',
    image:
      'https://5.imimg.com/data5/ANDROID/Default/2021/2/SQ/XQ/UG/119952180/product-jpeg-500x500.jpg',
  },
];
export default categories;
