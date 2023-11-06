package com.ssafy.device.model;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ssafy.common.converter.BooleanToYNConverter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "NFC")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class NFC {

	@Id
	@Column(name = "ID")
	private String ID;
	
	@Column(name = "IS_DEVICE")
	@Convert(converter = BooleanToYNConverter.class)
	private boolean isDevice;
}
