import { Request, Response } from "express";
import { Order } from "../models/order";
import  User  from "../models/User";
import { Product } from "../models/Product";
import mongoose from "mongoose";

// helper date functions
function startOfDaysAgo(days: number) {
  const d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() - (days - 1)); // inclusive
  return d;
}
function startOfMonth() {
  const d = new Date();
  d.setDate(1); d.setHours(0,0,0,0);
  return d;
}
function startOfYear() {
  const d = new Date();
  d.setMonth(0,1); d.setHours(0,0,0,0);
  return d;
}

export const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    // parallel queries
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenueAgg,
      ordersByStatus,
      topProducts,
      revenueLast30Days
    ] = await Promise.all([

      Order.countDocuments(),
      User.countDocuments(),
      Product.countDocuments(),

      Order.aggregate([
        { $match: { paymentStatus: "Paid" } }, // optional rule
        { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
      ]),

      Order.aggregate([
        { $group: { _id: "$orderStatus", count: { $sum: 1 } } }
      ]),

      Order.aggregate([
        { $unwind: "$items" },
        { $group: {
            _id: "$items.productId",
            totalQty: { $sum: "$items.quantity" },
            revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
        }},
        { $sort: { totalQty: -1 } },
        { $limit: 10 },
        { $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product"
        }},
        { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
        { $project: { productName: "$product.name", totalQty: 1, revenue: 1 } }
      ]),
      
      Order.aggregate([
        { $match: { paymentStatus: "Paid", placedAt: { $gte: startOfDaysAgo(30) } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$placedAt" } },
            totalSales: { $sum: "$totalAmount" },
            orders: { $sum: 1 }
          }
        },
        { $sort: { "_id": 1 } }
      ])
    ]);

    const totalRevenue = totalRevenueAgg[0]?.totalRevenue || 0;
    const avgOrderValue = totalOrders ? (totalRevenue / totalOrders) : 0;

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue,
      avgOrderValue,
      ordersByStatus,
      topProducts,
      revenueLast30Days
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};


export const getRevenueByPeriod = async (req: Request, res: Response) => {
  try {
    const { period, start, end } = req.query as { period?: string, start?: string, end?: string };

    let match: any = { paymentStatus: "Paid" }; // only include paid orders if desired
    if (start && end) {
      match.placedAt = { $gte: new Date(start), $lte: new Date(end) };
    } else if (period === "week") {
      match.placedAt = { $gte: startOfDaysAgo(7) };
    } else if (period === "month") {
      match.placedAt = { $gte: startOfMonth() };
    } else if (period === "year") {
      match.placedAt = { $gte: startOfYear() };
    } else {
      // default to last 30 days
      match.placedAt = { $gte: startOfDaysAgo(30) };
    }

    // choose grouping format based on period
    let dateFormat = "%Y-%m-%d";
    if (period === "month") dateFormat = "%Y-%m";
    if (period === "year") dateFormat = "%Y";

    const revenue = await Order.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$placedAt" } },
          totalSales: { $sum: "$totalAmount" },
          orders: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({ revenue });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
