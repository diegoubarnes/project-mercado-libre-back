import axios, { AxiosResponse } from "axios";
import { Application, Request, Response } from "express";

import { ItemProduct } from "../models/ItemProduct";
import { Product } from "../models/Product";

const author = { name: "Diego", lastname: "Ubarnes" };

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api", (req: Request, res: Response) => {
    return res.status(200).send({
      version: "1.0.0-beta",
      name: "Api Demo MercadoLibre",
      description: "Api para consulta de productos en MercadoLibre",
      author,
    });
  });

  /**
   * Endpoint de consumo [search]
    https://api.mercadolibre.com/sites/MLA/search?q=:query
   */

  app.get("/api/search", async (req: Request, res: Response) => {
    console.log(req.query);
    let items = null;

    if (!req.query.q || req.query.q == '' ) {
      return res.status(400).json({ author, message: "param :q is required" });
    }

    try {
      const result: AxiosResponse = await axios.get(
        "https://api.mercadolibre.com/sites/MLA/search?q=" + req.query.q
      );

      items = {
        author,
        items: [...result?.data?.results?.map((item: any) => new Product(item))]
      };
    } catch (error) {
      items = { author, items: req.query.q + " Not Found" };
    }

    return res.status(200).json({ ...items })
  });

  /**
   * Endpoint de consumo de [items]
    https://api.mercadolibre.com/items/:id
    https://api.mercadolibre.com/items/:id/description
   */

  app.get("/api/items/:id?", async (req: Request, res: Response) => {
    let items = null;

    if (!req.params.id) {
      return res.status(400).json({ author, message: "param :id is required" });
    }

    try {
      const result: AxiosResponse = await axios.get(
        "https://api.mercadolibre.com/items/" + req.params.id
      );

      const descriptionRequest: AxiosResponse = await axios.get(
        "https://api.mercadolibre.com/items/" + req.params.id + "/description"
      );

      const descriptionResult = descriptionRequest.data;

      items = {
        author,
        item: new ItemProduct({
          ...result.data,
          description: descriptionResult?.plain_text,
        }),
      };
    } catch (error) {
      items = { author, item: req.params.id + " Not Found" };
    }

    return res.status(200).json({ ...items });
  });
};
