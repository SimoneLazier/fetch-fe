const useDogs = async (): Promise<Dog[]> => {
  await new Promise((res) => setTimeout(res, 2000))

  return [
    {
      id: '1',
      name: 'Praveen',
      breed: 'Breed',
      age: 1,
      zip_code: '60607',
      img: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    },
  ]
}

export default useDogs
