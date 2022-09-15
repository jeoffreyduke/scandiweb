import { createSlice, current } from "@reduxjs/toolkit";

const IdBuilder = () => {
  let finalId = "";

  return {
    addId(id) {
      finalId += id;
      return this;
    },
    build() {
      return finalId;
    },
    clear() {
      finalId = "";
    },
  };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalItemQuantity: 0,
    products: [],
  },
  reducers: {
    addIntoCart: (state, action) => {
      const id = IdBuilder().addId(action.payload.product.data.id);
      action.payload.product.attributeData.forEach((item) => {
        id.addId(`-${item.name.replace(/ /g, "-")}-${item.selectedIndex}`);
      });
      const products = state.products.map((item) => {
        if (item.id === id.build()) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      if (state.products.find((item) => item.id === id.build())) {
        return {
          ...state,
          products: [...products],
          totalItemQuantity: state.totalItemQuantity + 1,
        };
      }
      return {
        ...state,
        products: [
          ...state.products,
          { id: id.build(), product: action.payload.product, quantity: 1 },
        ],
        totalItemQuantity: state.totalItemQuantity + 1,
      };
    },
    removeFromCart: (state, action) => {
      if (state.products.find((item) => item.id === action.payload.id)) {
        if (
          state.products.find(
            (item) => item.quantity === 1 && item.id === action.payload.id
          )
        ) {
          return {
            ...state,
            products: state.products.filter((product) => {
              return product.id !== action.payload.id;
            }),
            totalItemQuantity: state.totalItemQuantity - 1,
          };
        }
        const products = state.products.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        return {
          ...state,
          products: [...products],
          totalItemQuantity: state.totalItemQuantity - 1,
        };
      }

      return {
        ...state,
      };
    },
    emptyCart: (state) => {
      state.products = [];
      state.totalItemQuantity = 0;
    },
    setNewAttributeSelectedIndex: (state, action) => {
      let oldId = "";
      let newId = "";
      const newProducts = state.products.map((item) => {
        const id = IdBuilder();
        const newAttributeData = item.product.attributeData.map((attrItem) => {
          if (
            attrItem.name === action.payload.name &&
            item.id === action.payload.id
          ) {
            oldId = item.id;
            id.addId(item.product.data.id);
            id.addId(
              `-${action.payload.name.replace(/ /g, "-")}-${
                action.payload.index
              }`
            );
            newId = id.build();
            return {
              name: attrItem.name,
              selectedIndex: action.payload.index,
            };
          }
          return current(attrItem);
        });
        if (id.build() !== "") {
          newId = id.build();
        }

        return {
          ...item,
          id: id.build() === "" ? item.id : id.build(),
          product: {
            ...item.product,
            attributeData: newAttributeData,
          },
        };
      });

      if (state.products.find((item) => item.id === newId)) {
        let newQuantity = 0;
        const newProductsMerged = current(state)
          .products.filter((item) => {
            if (item.id === oldId) {
              newQuantity = item.quantity;
            }
            return item.id !== oldId;
          })
          .map((item) => {
            return {
              ...item,
              quantity: item.quantity + newQuantity,
            };
          });

        return {
          ...state,
          products: newProductsMerged,
        };
      }
      return {
        ...state,
        products: newProducts,
      };
    },
  },
});

export const {
  addIntoCart,
  removeFromCart,
  emptyCart,
  setNewAttributeSelectedIndex,
} = cartSlice.actions;

export default cartSlice.reducer;
