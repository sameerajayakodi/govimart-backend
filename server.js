const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://govimart-client.vercel.app",
];

const startServer = async () => {
  await connectDB();
  await connectCloudinary();

  app.post(
    "/stripe",
    express.raw({ type: "application/json" }),
    stripeWebhooks
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use(cors({ origin: allowedOrigins, credentials: true }));

  app.get("/", (req, res) => {
    res.send("API is Working");
  });

  app.use("/api/user", userRouter);
  app.use("/api/seller", sellerRouter);
  app.use("/api/product", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/address", addressRouter);
  app.use("/api/order", orderRouter);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
