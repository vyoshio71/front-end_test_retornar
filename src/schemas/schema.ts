import { z } from "zod";

export const FruitSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  img: z.string().optional(),
});

export const SizeSchema = z.object({
  id: z.number(),
  name: z.string(),
  volume_ml: z.number(),
  price: z.number(),
  delivery_time: z.number(),
});

export const AddonSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  img: z.string().optional(),
});

export const OrderSchema = z.object({
  menuTitle: z.string(),
  menuSubTitle: z.string(),
  stepInfo: z.string(),
  items: z.array(z.unknown()),
  controllerName: z.string(),
  handleBack: z.function().returns(z.void()),
  inputType: z.string(),
  hasIcon: z.boolean(),
  img_alt: z.string().optional(),
  control: z.any(),
  errors: z.any(),
  bannerSrc: z.string(),
  bannerDesktopSrc: z.string(),
  totalPrice: z.number(),
  handleNextStep: z.function().returns(z.void()),
  count: z.number(),
  handleDecrement: z.function().returns(z.void()),
  handleIncrement: z.function().returns(z.void()),
  required: z.boolean(),
});

export const BannerSchema = z.object({
  handleBack: z.function().returns(z.void()),
  bannerSrc: z.string(),
  hasBackButton: z.boolean().optional(),
});

export const FooterSchema = z.object({
  totalPrice: z.number(),
  handleNextStep: z.function().returns(z.void()),
  count: z.number(),
  handleDecrement: z.function().returns(z.void()),
  handleIncrement: z.function().returns(z.void()),
});

export const OrderCheckoutSchema = z.object({
  handleBack: z.function().args().returns(z.void()),
});

export const OrderStepsSchema = z.object({
  size: z.number().min(1, { message: "Você deve selecionar um tamanho." }),
  fruit: z.number().min(1, { message: "Você deve selecionar uma fruta." }),
  addons: z.array(z.number()),
});

export const AcaiSchema = z.object({
  size: z.string().min(1, { message: "Você deve selecionar um tamanho." }),
  fruit: z.string().min(1, { message: "Você deve selecionar uma fruta." }),
  side_dishes: z.array(z.string()),
  total_price: z.number(),
  estimate: z.number(),
  amount: z.number(),
  created_at: z.string(),
  id: z.number().optional(),
});

export const OrderStateSchema = z.object({
  selectedSize: z.number(),
  selectedFruit: z.number(),
  selectedAddons: z.array(z.number()),
  totalPrice: z.number(),
  count: z.number(),
});

export const ModalSchema = z.object({
  isModalOpen: z.boolean(),
  onClose: z.function().returns(z.void()),
  children: z.any(),
});

export const SnackBarSchema = z.object({
  show: z.boolean(),
  message: z.string(),
});

export const AuthUserSchema = z.object({
  userName: z.string().min(1, { message: "Nome é obrigatório!" }),
  isLoggedIn: z.boolean(),
});

export const DropdownMenuSchema = z.object({
  isOpen: z.boolean(),
  onClose: z.function().returns(z.void()),
});

export const HeaderSchema = z.object({
  handleBackRoute: z.function().returns(z.void()),
});

export const OrderCardSchema = z.object({
  acai: AcaiSchema,
  isDelivered: z.boolean(),
});
