import React, { PureComponent } from "react";
import { View, Text, Image } from "react-native";
import { REPO_IMG_PRODUCT_SERV_URL } from "@utils/Constants";

class CardProductResultCategories extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = this.props.styles;
    const rowData = this.props.rowData;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderSectionOne}>
            <View style={styles.pharmacyRow}>
              <Text style={styles.pharmacyTopCard}>
                {rowData.pharmacyChainName} -{" "}
              </Text>
              <Text style={styles.pharmacyStockTopCard}>
                {rowData.stock == true ? "Hay Stock" : "Sin Info Stock"}
              </Text>
            </View>
            <Text style={styles.titleProduct}>{rowData.productName}</Text>
            <Text style={styles.activePrincipleGramajeProduct}>
              {rowData.activePrincipleName}
              {rowData.composition}
            </Text>
            <Text style={styles.quantityProduct}>{rowData.presentation}</Text>
            <Text style={styles.laboratoryProduct}>{rowData.labName}</Text>
          </View>
          <View style={styles.cardHeaderSectionTwo}>
            <Image
              style={styles.imageProduct}
              source={{
                uri: REPO_IMG_PRODUCT_SERV_URL + rowData.productImageUrl
              }}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.cardHeader}>
          <Text style={styles.priceLabel}>PRECIO LISTA</Text>
          <Text
            style={[
              styles.price,
              rowData.discountPrice > 0 ? styles.textDecoration : null
            ]}
          >
            $ {rowData.listPrice} CLP
          </Text>
          {rowData.discountPrice > 0 ? (
            <View style={styles.yappLifeRow}>
              <Text style={styles.discountLabel}>{rowData.discount}</Text>
              <Text style={styles.totalPriceWithDiscount}>
                $ {rowData.discountPrice} CLP
              </Text>
            </View>
          ) : (
            <Text />
          )}
        </View>
      </View>
    );
  }
}

export default CardProductResultCategories;
