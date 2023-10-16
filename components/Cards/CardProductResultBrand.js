import React, { PureComponent } from "react";
import { View, Text, Image } from "react-native";
import { REPO_IMG_PHARM_LOGO_SERV_URL } from "@utils/Constants";

class CardProductResultBrand extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = this.props.styles;
    const rowData = this.props.rowData;
    return (
      <View style={styles.cardContainerBrand}>
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderSectionOneBrand}>
            <Image
              style={styles.imagePharmacy}
              source={{
                uri: REPO_IMG_PHARM_LOGO_SERV_URL + rowData.pharmacyChainLogo
              }}
            />
          </View>
          <View style={styles.cardHeaderSectionTwoBrand}>
            <Text style={styles.pharmacyTopCardBrand}>
              {rowData.pharmacyChainName}{" "}
            </Text>
            <Text style={styles.pharmacyStockTopCardBrand}>
              {rowData.stock == true ? "Hay Stock" : "Sin Info Stock"} -{" "}
              {rowData.pharmacyAvailable}
            </Text>
            <Text style={styles.laboratoryProductBrand}>{rowData.labName}</Text>
          </View>
          <View style={styles.cardHeaderSectionThreeBrand} />
        </View>
        <View style={styles.separator} />

        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderSectionTwoBrand} />
          <Text style={styles.priceLabelBrand}>PRECIO LISTA</Text>
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
              <Text style={styles.discountLabelBrand}>{rowData.discount}</Text>
              <Text style={styles.totalPriceWithDiscountBrand}>
                ${rowData.discountPrice} CLP
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

export default CardProductResultBrand;
