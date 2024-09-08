import { z } from "zod";

import {
  OrderCheckoutSchema,
  FruitSchema,
  SizeSchema,
  AddonSchema,
  OrderSchema,
  BannerSchema,
  FooterSchema,
  OrderStepsSchema,
  AcaiSchema,
  OrderStateSchema,
  ModalSchema,
  SnackBarSchema,
  AuthUserSchema,
  DropdownMenuSchema,
  HeaderSchema,
} from "../schemas/schema";

export type ISize = z.infer<typeof SizeSchema>;

export type IFruit = z.infer<typeof FruitSchema>;

export type IAddons = z.infer<typeof AddonSchema>;

export type IAcai = z.infer<typeof AcaiSchema>;

export type IFooter = z.infer<typeof FooterSchema>;

export type IBanner = z.infer<typeof BannerSchema>;

export type IOrder = z.infer<typeof OrderSchema>;

export type IOrderFormValues = z.infer<typeof OrderStepsSchema>;

export type IOrderCheckout = z.infer<typeof OrderCheckoutSchema>;

export type IOrderState = z.infer<typeof OrderStateSchema>;

export type IModal = z.infer<typeof ModalSchema>;

export type ISnackBar = z.infer<typeof SnackBarSchema>;

export type IAuthUser = z.infer<typeof AuthUserSchema>;

export type IDropdownMenu = z.infer<typeof DropdownMenuSchema>

export type IHeader = z.infer<typeof HeaderSchema>
