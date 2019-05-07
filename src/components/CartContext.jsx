import createPersistedState from 'use-persisted-state';
import { useCartkit } from './shopkit/Cartkit';

const PRODUCT_IMAGES_ID = 'product_images';
const useProductImages = createPersistedState(PRODUCT_IMAGES_ID);

export function useProducts() {
  const [productImages, setProductImages] = useProductImages({});
  const { addToCart, updateQuantity, count, items, ...rest } = useCartkit();

  const products = items.map(item => ({
    ...item,
    thumbnail: productImages[item.product_id],
    price: item.unit_price.amount / 100,
    amount: item.quantity,
  }));

  async function addProduct(product, amount) {
    const productInList = products.find(p => p.sku === product.sku);

    if (productInList) {
      const finalAmount = Number(amount) + Number(productInList.amount);
      updateQuantity(productInList.id, finalAmount);
      return;
    }

    setProductImages({ ...productImages, [product.id]: product.thumbnail });
    return await addToCart(product.id, Number(amount));
  }

  console.log(rest);

  return {
    ...rest,
    updateQuantity,
    products,
    addProduct,
    productAmount: count,
  };
}
