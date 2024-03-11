import { CreateOrderDto, OrderDto, orderControllerCreateOrder, orderControllerGetListOrders } from '@/api/auth-proxies';
import dayjs from 'dayjs';
import create from 'zustand'

export interface Order {
    id?: string;
    batch: string;
    batchCode: string;
    orderType: string;
    customerTissueLineCode: string;
    tissueLineCode: string;
    quantityDelivered: number;
    weekDelivered: number;
    yearDelivered: number;
    locationDelivered: string;
    confirmationStatus: string;
    labQuantityDelivered: number;
    labWeekDelivered: number;
    customerInfo: string;
    labNote?: string;
    cellCultureId: string;
    customerId?: string;
    actualDeliveryDate: string;
    actualBagsDelivered: number;
    actualTreesDelivered: number;
}

type OrderState = {
    error: string | null;
    isLoading: boolean;
    orders: OrderDto[];
    order: Order;
    saveOrder: (staffOrder: Order) => void; 
    createOrder: (order: CreateOrderDto) => Promise<void>;
    filterOrders: () => Promise<void>;
}

export const orderStore = create<OrderState>((set) => ({
    isLoading: false,
    error: null,
    orders: [],
    order: { 
        id: '',
        batch: '',
        batchCode: '',
        orderType: 'Pending',
        customerTissueLineCode: '',
        tissueLineCode: '',
        quantityDelivered: 0,
        weekDelivered: 0,
        yearDelivered: 0,
        locationDelivered: '',
        confirmationStatus: '',
        labQuantityDelivered: 0,
        labWeekDelivered: 0,
        customerInfo: '',
        labNote: '',
        cellCultureId: '',
        customerId: '',
        actualDeliveryDate:  '',
        actualBagsDelivered: 0,
        actualTreesDelivered: 0,
    },
    saveOrder: (staffOrder: Order) => {
        console.log('staffOrder: ', staffOrder)
        set((state) => ({...state, order: {...staffOrder}}))
    },
    createOrder: async (payload: CreateOrderDto) => {
        set((state) => ({...state, isLoading: true}));
        const { data } = await orderControllerCreateOrder(payload);
        set((state) => ({...state, isLoading: false, order: data}));
    },
    filterOrders: async () => {
        try {
          set({ isLoading: true, error: null });
          const { data } = await orderControllerGetListOrders();
          set((state) => ({...state, isLoading: false, orders: data}));
          
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },

}));
